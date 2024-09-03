import logging

import requests
from requests.compat import urljoin

logger = logging.getLogger(__name__)


class SimpleRequester:
    def __init__(self, base_url: str | None = None, session: requests.Session = None):
        self.base_url = base_url
        self.session = session if session else requests.Session()

    def get(self, path: str = "") -> str | None:
        url = urljoin(self.base_url, path)
        logger.info("GET %s", url)

        try:
            response = self.session.get(url, timeout=1)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            logger.error("Error: %s", e)
            return None

        return str(response.text)
