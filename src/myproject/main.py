import argparse


def hello(name: str) -> str:
    return f"Ciao, {name}!"


def main() -> None:
    parser = argparse.ArgumentParser(description="Esempio di CLI per myproject")
    parser.add_argument("name", nargs="?", default="Mondo", help="Nome da salutare")
    args = parser.parse_args()
    print(hello(args.name))


if __name__ == "__main__":
    main()
