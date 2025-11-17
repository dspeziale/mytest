from src.myproject.main import hello


def test_hello_default():
    assert hello("Mondo") == "Ciao, Mondo!"


def test_hello_name():
    assert hello("Daniele") == "Ciao, Daniele!"
