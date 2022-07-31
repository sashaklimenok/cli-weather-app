export class ExceptionFilter {
  constructor(log) {
    this.log = log;
  }

  handleApiError(status) {
    switch (status) {
      case 400:
        this.log.error("Not valid params");
        break;
      case 401:
        this.log.error("The token is not defined");
        break;
      case 404:
        this.log.error("The city is not defined");
        break;
      default:
        this.log.error(status);
        break;
    }
  }
}
