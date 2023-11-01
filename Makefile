# Makefile for pd4web

# Define variables
PD4WEB = pd4web
PATCH_FILE = ./main.pd
PAGE_FOLDER = piece-page
INITIAL_MEMORY = 64

# Default target
all: generate_pages

# Generate pages using pd4web
generate_pages:
	$(PD4WEB) --patch $(PATCH_FILE) --page-folder $(PAGE_FOLDER) --initial-memory $(INITIAL_MEMORY)

# Clean up generated files
clean:
	rm -rf $(PAGE_FOLDER)

# Phony targets
.PHONY: all generate_pages clean

