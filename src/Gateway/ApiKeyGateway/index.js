import Cookies from 'js-cookie'

export default class ApiKeyGateway {
  save(apiKey) {
    Cookies.set('apiKey', apiKey)
  }

  get() {
    return Cookies.get('apiKey')
  }
}