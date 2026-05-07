import json
import sys
import time

from deep_translator import GoogleTranslator


def main() -> int:
    target = sys.argv[1]
    strings = json.loads(sys.stdin.buffer.read().decode("utf-8"))
    translator = GoogleTranslator(source="ko", target=target)

    try:
        translated = translator.translate_batch(strings)
    except Exception:
        translated = []
        for text in strings:
            translated.append(translator.translate(text))
            time.sleep(0.15)

    normalized = [
        value if isinstance(value, str) and value else strings[index]
        for index, value in enumerate(translated)
    ]
    sys.stdout.buffer.write(json.dumps(normalized, ensure_ascii=False).encode("utf-8"))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
