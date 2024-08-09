import unittest
from unittest.mock import patch, MagicMock

from requester import SimpleRequester as req
from requests import Session
from requests.exceptions import RequestException

class TestSimpleRequester(unittest.TestCase):
    
    @patch.object(Session, 'get')
    def test_get_success(self, mock_get):
        # Configure mock
        mock_response = MagicMock()
        mock_response.text = 'Success'
        mock_get.return_value = mock_response
        
        requester = req(base_url='http://example.com')
        response = requester.get('/path')
        
        self.assertEqual(response, 'Success')
        mock_get.assert_called_once_with('http://example.com/path', timeout=1)
        
    @patch.object(Session, 'get')
    def test_get_failure(self, mock_get):
        # Configure mock
        mock_response = MagicMock()
        mock_response.raise_for_status.side_effect = RequestException('Error')
        mock_get.return_value = mock_response
        
        requester = req(base_url='http://example.com')
        response = requester.get('/path')
        
        self.assertIsNone(response)
        mock_get.assert_called_once_with('http://example.com/path', timeout=1)
        