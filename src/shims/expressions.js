/**
 * Minimal shim for the missing Piper expressions helper.
 * It fulfils the public contract used inside `piper-wasm`.
 */
export class Expressions {
  constructor({ ipa = '', duration = 0 } = {}) {
    this.ipa = ipa;
    this.duration = duration;
    this.faceExpressions = [];
  }

  static async inferEmotionsFromText(_text, _maxTokens, _workerUrl, onProgress) {
    onProgress?.(100);
    return [
      {
        duration: 0,
        expressions: [],
        provider: 'stubbed',
      },
    ];
  }
}
