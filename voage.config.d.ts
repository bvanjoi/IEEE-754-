/**
 * configuration for voage.config.js,
 * And it will pass to webpack config.
 */
interface Configuration {
  asset?: {
    /**
     * If the asset size bigger than `maxInlineAssetSize`,
     * it will emitted to output directory.
     * otherwise it inject into bundle.
     *
     * unit: byte
     */
    maxInlineAssetSize?: number;
  };
}
