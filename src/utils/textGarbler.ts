/**
 * 日本語テキストを文字化けさせる関数
 * 実際の文字化け（mojibake）をシミュレートします
 * @param text 文字化けさせるテキスト
 * @param intensity 文字化けの強度 (0-1), デフォルト 0.5
 * @returns 文字化けしたテキスト
 */
export function garbleText(text: string, intensity: number = 0.5): string {
  if (!text) return text;

  // 強度を0-1の範囲に制限
  intensity = Math.max(0, Math.min(1, intensity));

  // 文字化けのシミュレーション
  // UTF-8 → Shift-JIS → UTF-8 の変換エラーをシミュレート
  const shiftJISLikeMap: { [key: string]: string } = {
    // ひらがな
    あ: "縺",
    い: "縺�",
    う: "縺�",
    え: "縺�",
    お: "縺�",
    か: "縺�",
    き: "縺�",
    く: "縺�",
    け: "縺�",
    こ: "縺�",
    さ: "縺�",
    し: "縺�",
    す: "縺�",
    せ: "縺�",
    そ: "縺�",
    た: "縺�",
    ち: "縺｡",
    つ: "縺､",
    て: "縺ｦ",
    と: "縺ｨ",
    な: "縺ｪ",
    に: "縺ｫ",
    ぬ: "縺ｬ",
    ね: "縺ｭ",
    の: "縺ｮ",
    は: "縺ｯ",
    ひ: "縺ｲ",
    ふ: "縺ｵ",
    へ: "縺ｸ",
    ほ: "縺ｻ",
    ま: "縺ｾ",
    み: "縺ｿ",
    む: "繧�",
    め: "繧�",
    も: "繧�",
    や: "繧�",
    ゆ: "繧�",
    よ: "繧�",
    ら: "繧�",
    り: "繧�",
    る: "繧�",
    れ: "繧�",
    ろ: "繧�",
    わ: "繧�",
    を: "繧�",
    ん: "繧�",
    が: "縺�",
    ぎ: "縺�",
    ぐ: "縺�",
    げ: "縺�",
    ご: "縺�",
    ざ: "縺�",
    じ: "縺�",
    ず: "縺�",
    ぜ: "縺�",
    ぞ: "縺�",
    だ: "縺�",
    ぢ: "縺｢",
    づ: "縺･",
    で: "縺ｧ",
    ど: "縺ｩ",
    ば: "縺ｰ",
    び: "縺ｳ",
    ぶ: "縺ｶ",
    べ: "縺ｹ",
    ぼ: "縺ｼ",
    ぱ: "縺ｱ",
    ぴ: "縺ｴ",
    ぷ: "縺ｷ",
    ぺ: "縺ｺ",
    ぽ: "縺ｽ",

    // カタカナ
    ア: "繧｢",
    イ: "繧､",
    ウ: "繧ｦ",
    エ: "繧ｨ",
    オ: "繧ｪ",
    カ: "繧ｫ",
    キ: "繧ｭ",
    ク: "繧ｯ",
    ケ: "繧ｱ",
    コ: "繧ｳ",
    サ: "繧ｵ",
    シ: "繧ｷ",
    ス: "繧ｹ",
    セ: "繧ｻ",
    ソ: "繧ｽ",
    タ: "繧ｿ",
    チ: "繝�",
    ツ: "繝�",
    テ: "繝�",
    ト: "繝�",
    ナ: "繝�",
    ニ: "繝�",
    ヌ: "繝�",
    ネ: "繝�",
    ノ: "繝�",
    ハ: "繝�",
    ヒ: "繝�",
    フ: "繝�",
    ヘ: "繝�",
    ホ: "繝�",
    マ: "繝�",
    ミ: "繝�",
    ム: "繝�",
    メ: "繝｡",
    モ: "繝｢",
    ヤ: "繝､",
    ユ: "繝ｪ",
    ヨ: "繝ｨ",
    ラ: "繝ｩ",
    リ: "繝ｪ",
    ル: "繝ｫ",
    レ: "繝ｬ",
    ロ: "繝ｭ",
    ワ: "繝ｯ",
    ヲ: "繝ｲ",
    ン: "繝ｳ",
    ガ: "繧ｬ",
    ギ: "繧ｮ",
    グ: "繧ｰ",
    ゲ: "繧ｲ",
    ゴ: "繧ｴ",
    ザ: "繧ｶ",
    ジ: "繧ｸ",
    ズ: "繧ｺ",
    ゼ: "繧ｼ",
    ゾ: "繧ｾ",
    ダ: "繝�",
    ヂ: "繝�",
    ヅ: "繝�",
    デ: "繝�",
    ド: "繝�",
    バ: "繝�",
    ビ: "繝�",
    ブ: "繝�",
    ベ: "繝�",
    ボ: "繝�",
    パ: "繝代",
    ピ: "繝斐",
    プ: "繝励",
    ペ: "繝壹",
    ポ: "繝�",

    // 記号
    "。": "縲�",
    "、": "縲�",
    "「": "縲�",
    "」": "縲�",
    "・": "繝ｻ",
    "！": "�ｼ�",
    "？": "�ｼ�",
    ー: "繝ｼ",

    // 半角カタカナ
    ｱ: "�ｽｱ",
    ｲ: "�ｽｲ",
    ｳ: "�ｽｳ",
    ｴ: "�ｽｴ",
    ｵ: "�ｽｵ",
    ｶ: "�ｽｶ",
    ｷ: "�ｽｷ",
    ｸ: "�ｽｸ",
    ｹ: "�ｽｹ",
    ｺ: "�ｽｺ",
    ﾀ: "�ｾ�",
    ﾁ: "�ｾ�",
    ﾂ: "�ｾ�",
    ﾃ: "�ｾ�",
    ﾄ: "�ｾ�",
    ﾅ: "�ｾ�",
    ﾆ: "�ｾ�",
    ﾇ: "�ｾ�",
    ﾈ: "�ｾ�",
    ﾉ: "�ｾ�",
    ﾊ: "�ｾ�",
    ﾋ: "�ｾ�",
    ﾌ: "�ｾ�",
    ﾍ: "�ｾ�",
    ﾎ: "�ｾ�",
    ﾏ: "�ｾ�",
    ﾐ: "�ｾ�",
    ﾑ: "�ｾ�",
    ﾒ: "�ｾ�",
    ﾓ: "�ｾ�",
    ﾔ: "�ｾ�",
    ﾕ: "�ｾ�",
    ﾖ: "�ｾ�",
    ﾗ: "�ｾ�",
    ﾘ: "�ｾ�",
    ﾙ: "�ｾ�",
    ﾚ: "�ｾ�",
    ﾛ: "�ｾ�",
    ﾜ: "�ｾ�",
    ｦ: "�ｽｦ",
    ﾝ: "�ｾ�",
  };

  // 漢字用の文字化けパターン
  const kanjiGarblePatterns = [
    "譁�",
    "蟄�",
    "蛹�",
    "縺�",
    "繧�",
    "繝�",
    "�ｽ�",
    "�ｾ�",
    "�･",
    "髯ｽ",
    "鬮�",
    "髦ｪ",
    "逋ｺ",
    "髮�",
    "鬥�",
    "髴�",
    "驛ｽ",
    "髯｢",
    "髫�",
    "髴ｲ",
    "驥�",
    "髯ｪ",
    "髮ｻ",
    "髢�",
    "髢�",
    "髫�",
    "髦ｭ",
    "�ｼ�",
    "�ｼ�",
    "�ｼ�",
    "�ｼ�",
    "�ｼ�",
    "�ｼ�",
    "�ｼ�",
    "�ｼ�",
    "�ｼ�",
  ];

  // 文字化けの種類
  const garbleTypes = [
    "shift-jis", // Shift-JIS風の文字化け
    "euc-jp", // EUC-JP風の文字化け
    "iso-2022-jp", // JIS風の文字化け
    "utf-8-bom", // UTF-8 BOM付き風の文字化け
  ];

  // 文字コードと位置に基づいた決定論的な文字化けタイプの選択
  const getGarbleType = (char: string, index: number): string => {
    const charCode = char.charCodeAt(0);
    return garbleTypes[(charCode * 3 + index * 7) % garbleTypes.length];
  };

  // 漢字を文字化けさせる
  const garbleKanji = (char: string, index: number): string => {
    const charCode = char.charCodeAt(0);
    const patternIndex =
      (charCode * 11 + index * 13) % kanjiGarblePatterns.length;
    return kanjiGarblePatterns[patternIndex];
  };

  // 文字を文字化けさせる
  const garbleChar = (char: string, index: number): string => {
    // 文字コードと位置に基づいた決定論的な値
    const charCode = char.charCodeAt(0);
    const seed = ((charCode * 31 + index * 17) % 1000) / 1000;

    // 強度に基づいて文字化けするかどうかを決定
    if (seed < intensity) {
      // 漢字の場合
      if (/[\u4e00-\u9faf]/.test(char)) {
        return garbleKanji(char, index);
      }

      // マッピングがある場合はそれを使用
      if (char in shiftJISLikeMap) {
        return shiftJISLikeMap[char];
      }

      // 英数字と記号の場合
      if (/[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(char)) {
        // 文字化けタイプに基づいて処理
        const type = getGarbleType(char, index);
        switch (type) {
          case "shift-jis":
            return "�";
          case "euc-jp":
            return "縺";
          case "iso-2022-jp":
            return "繝�";
          case "utf-8-bom":
            return "�ｼ�";
          default:
            return "�";
        }
      }
    }

    // 文字化けしない場合は元の文字を返す
    return char;
  };

  // テキストを文字単位で処理
  return Array.from(text)
    .map((char, index) => garbleChar(char, index))
    .join("");
}

/**
 * テキストに進行的な文字化けを適用（徐々に文字化けが強くなる）
 * @param text 文字化けさせるテキスト
 * @param startIntensity 開始強度 (0-1), デフォルト 0.1
 * @param endIntensity 終了強度 (0-1), デフォルト 0.8
 * @returns 進行的に文字化けしたテキスト
 */
export function progressiveGarble(
  text: string,
  startIntensity: number = 0.1,
  endIntensity: number = 0.8
): string {
  if (!text) return text;

  const chars = Array.from(text);
  const step = (endIntensity - startIntensity) / (chars.length || 1);

  let result = "";
  for (let i = 0; i < chars.length; i++) {
    const currentIntensity = startIntensity + step * i;
    // 文字コードと位置に基づいた決定論的な値
    const charCode = chars[i].charCodeAt(0);
    const seed = ((charCode * 31 + i * 17) % 1000) / 1000;

    if (seed < currentIntensity) {
      result += garbleText(chars[i], 1.0);
    } else {
      result += chars[i];
    }
  }

  return result;
}

/**
 * テキストの一部に文字化けを適用
 * @param text 部分的に文字化けさせるテキスト
 * @param intensity 文字化けの強度 (0-1), デフォルト 0.5
 * @returns 部分的に文字化けしたテキスト
 */
export function partialGarble(text: string, intensity: number = 0.5): string {
  if (!text || text.length < 3) return garbleText(text, intensity);

  // テキストを2-4文字のチャンクに分割
  const chunks: string[] = [];
  let currentIndex = 0;

  while (currentIndex < text.length) {
    // 文字コードに基づいた決定論的なチャンクサイズ
    const charCode = text.charCodeAt(currentIndex);
    const chunkSize = Math.min(
      ((charCode * 7) % 3) + 2, // 2-4文字
      text.length - currentIndex
    );

    chunks.push(text.substring(currentIndex, currentIndex + chunkSize));
    currentIndex += chunkSize;
  }

  // 一部のチャンクを文字化け
  return chunks
    .map((chunk, index) => {
      // チャンクの最初の文字コードに基づいた決定論的な値
      const charCode = chunk.charCodeAt(0);
      const seed = ((charCode * 13 + index * 29) % 1000) / 1000;

      // 一定の確率で文字を文字化け
      if (seed < intensity * 0.7) {
        return garbleText(chunk, intensity);
      }
      return chunk;
    })
    .join("");
}
