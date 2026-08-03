.PHONY: build build-prod build-no-cache run run-d prod clean logs shell backup restore deploy

# Default build (uses BuildKit cache mounts for speed)
build:
	DOCKER_BUILDKIT=1 docker build \
		--build-arg BUILDKIT_INLINE_CACHE=1 \
		-t eskai-landing:latest .

# Production optimized build (squash layers, smaller image)
build-prod:
	DOCKER_BUILDKIT=1 docker build \
		--build-arg BUILDKIT_INLINE_CACHE=1 \
		--squash \
		-t eskai-landing:latest .

# Force fresh build (no cache from previous Docker layers)
build-no-cache:
	DOCKER_BUILDKIT=1 docker build \
		--no-cache \
		-t eskai-landing:latest .

# Run the container on port 8080.
# IMPORTANT: mounts the named volume so the SQLite DB survives container
# recreation. Never run without the volume — data would be lost on `docker rm`.
run:
	docker run -d \
		--name eskai-landing \
		-p 8080:80 \
		-v eskai-landing_data:/app/data \
		eskai-landing:latest

# Run with local dev server (hot reload)
run-d:
	npm run dev

# Stop and remove container (keeps the named volume + data intact)
clean:
	-docker stop eskai-landing 2>/dev/null
	-docker rm eskai-landing 2>/dev/null

# Show container logs
logs:
	docker logs -f eskai-landing 2>/dev/null || echo "No running container 'eskai-landing'"

# Open a shell inside the builder stage for debugging
shell:
	DOCKER_BUILDKIT=1 docker build \
		--target builder \
		-t eskai-landing:builder .
	docker run --rm -it eskai-landing:builder sh

# Interactive build debugging — drops into a shell before build
debug:
	DOCKER_BUILDKIT=1 docker build \
		--target builder \
		-t eskai-landing:debug \
		--progress=plain \
		.
	docker run --rm -it --entrypoint sh eskai-landing:debug

# ─── Data safety ──────────────────────────────────────────────────────────────
# Backup the SQLite volume to ./backups/eskai-data-<date>.tar.gz
backup:
	@mkdir -p backups
	docker run --rm \
		-v eskai-landing_data:/data \
		-v "$$PWD/backups":/backup \
		alpine tar czf /backup/eskai-data-$$(date +%F-%H%M%S).tar.gz -C /data .
	@echo "Backup written to backups/"

# Restore the SQLite volume from a backup file (e.g. make restore FILE=backups/eskai-data-2026-08-03.tar.gz)
restore:
	@test -n "$(FILE)" || (echo "Usage: make restore FILE=backups/<file>.tar.gz" && exit 1)
	@test -f "$(FILE)" || (echo "Backup file not found: $(FILE)" && exit 1)
	@echo "Stopping container to restore safely..."
	-docker stop eskai-landing 2>/dev/null
	docker run --rm \
		-v eskai-landing_data:/data \
		-v "$$PWD":/backup \
		alpine sh -c "rm -rf /data/* && tar xzf /backup/$(FILE) -C /data"
	@echo "Restore complete. Restart with: make run  (or: docker compose up -d)"

# Safe redeploy: backup first, then rebuild + recreate via compose (volume preserved)
deploy:
	@echo "Backing up current data before redeploy..."
	@mkdir -p backups
	docker run --rm \
		-v eskai-landing_data:/data \
		-v "$$PWD/backups":/backup \
		alpine tar czf /backup/eskai-data-$$(date +%F-%H%M%S).tar.gz -C /data . 2>/dev/null || echo "No existing volume yet — skipping backup."
	@echo "Rebuilding and recreating container (volume preserved)..."
	docker compose up -d --build
	@echo "Deploy complete. Data is safe in the eskai-landing_data volume."