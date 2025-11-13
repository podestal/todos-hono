# Use the official Bun image (includes Node, npm, etc.)
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Expose default dev port
EXPOSE 3000

# Default command: interactive shell
CMD ["bash"]