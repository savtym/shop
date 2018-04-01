
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Validate {
	static userName(userName) {
		return 5 < userName.length;
	}

  static email(val) {
    return re.test(val);
  }

  static password(val) {
    return 7 < val.length;
  }

  static repeatPassword(pass, repeatPass) {
  	return pass === repeatPass;
	}
}

export default Validate;
