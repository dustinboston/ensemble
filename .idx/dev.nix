# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "unstable";

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.deno
  ];

  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "denoland.vscode-deno"
      "streetsidesoftware.code-spell-checker"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {};
    };

    # Workspace lifecycle hooks
    workspace = {
      onCreate = {};
      # Runs when the workspace is (re)started
      onStart = {};
    };
  };
}
