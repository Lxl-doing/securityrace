// 模拟后端服务器接口

// 模拟网络通信的等待
function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

// 模拟服务器相应结果
export async function login(loginId, loginPwd) {
  await delay(1000);
  if (loginId === "root" && loginPwd === "123123") {
    const user = {
      loginId,
      name: "管理员",
    };
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
  return null;
}


// 注销
export async function loginOut() {
  await delay(1000);
  localStorage.removeItem("user");
}

// 恢复登录
export async function whoAmI() {
  await delay(1000);
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
}
