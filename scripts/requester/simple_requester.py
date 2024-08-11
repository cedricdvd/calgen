import requests
from requests.compat import urljoin


class SimpleRequester:
    def __init__(self, base_url: str = None, session: requests.Session = None):
        self.base_url = base_url
        self.session = session if session else requests.Session()

    def get(self, path: str = "") -> str:
        url = urljoin(self.base_url, path)

        try:
            response = self.session.get(url, timeout=1)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")
            return None

        return response.text
