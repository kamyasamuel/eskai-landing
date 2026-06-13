.PHONY: build build-prod build-no-cache run run-d prod clean logs shell

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

# Run the container on port 8080
run:
	docker run -d \
		--name eskai-landing \
		-p 8080:80 \
		eskai-landing:latest

# Run with local dev server (hot reload)
run-d:
	npm run dev

# Stop and remove container
clean:
	-docker stop eskai-landing 2>/dev/null
	-docker rm eskai-landing 2>/dev/null
	-docker rmi eskai-landing:latest 2>/dev/null

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