enum LoginStatus {
  LoggedIn,
  LoggedOut,
  InProcess,
  Failed,
}

export class Auth {
  status: LoginStatus;
  constructor(status = LoginStatus.LoggedOut) {
    this.status = status;
  }
  async login(username: string, password: string) {
    this.status = LoginStatus.InProcess;
    const response = await fetch("./../pages/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (response.status < 300) {
    } else {
      this.status = LoginStatus.Failed;
    }
  }
  logout() {}
}
