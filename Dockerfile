# Use the official Bun image (includes Node, npm, etc.)
FROM oven/bun:latest

# Install Node 20 so CompressionStream is available
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get update \
  && apt-get install -y nodejs \
  && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Expose default dev port
EXPOSE 3000
EXPOSE 5000

# Default command: interactive shell
CMD ["bash"]