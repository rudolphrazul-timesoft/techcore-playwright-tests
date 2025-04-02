{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
    pkgs.replitPackages.jest
    
    # Playwright dependencies
    pkgs.xvfb-run
    pkgs.libgbm
    pkgs.libnss3
    pkgs.libnspr4
    pkgs.libdbus
    pkgs.libatk
    pkgs.libatk-bridge
    pkgs.libatspi2
    pkgs.libxcomposite
    pkgs.libxdamage
    pkgs.libxext
    pkgs.libxfixes
    pkgs.libxrandr
    pkgs.libgbm
    pkgs.libxcb
    pkgs.libxkbcommon
    pkgs.libasound2
    
    # Additional dependencies that might be needed
    pkgs.libdrm
    pkgs.libxshmfence
    pkgs.libx11
    pkgs.libxcursor
    pkgs.libxrender
    pkgs.libxi
    pkgs.libxss
    pkgs.libxtst
    pkgs.libpng
  ];
}