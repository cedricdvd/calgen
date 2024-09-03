from unittest.mock import MagicMock, patch

import pytest
from requests import Session
from requests.exceptions import RequestException

from requester import SimpleRequester as req


@pytest.fixture
def mock_get():

    mock_get = MagicMock(name="mockGet")
    mock_response = MagicMock(name="mockResponse")

    def side_effect(*args, **kwargs):
        if args[0] == "http://example.com/error":
            raise RequestException("Error")
        elif args[0] == "http://example.com/path":
            mock_response.text = "Success"

        return mock_response

    mock_get.side_effect = side_effect
    return mock_get


def test_get_success(mock_get):
    """
    Test that getMethod returns response text on success
    """
    with patch.object(Session, "get", mock_get):
        requester = req(base_url="http://example.com")
        response = requester.get("/path")

        assert response == "Success"
        mock_get.assert_called_once_with("http://example.com/path", timeout=1)


def test_get_failure(mock_get):
    """
    Test that getMethod returns None on failure
    """
    with patch.object(Session, "get", mock_get):
        requester = req(base_url="http://example.com")
        response = requester.get("/error")

        assert response is None
        mock_get.assert_called_once_with("http://example.com/error", timeout=1)
