## Docker(note1)

> 简单的说，又是一个便于团队开发的软件，这里只介绍 Docker 安装与最简单的测试。

### Docker 简介

> Docker 属于 Linux 容器的一种封装，提供简单易用的容器使用接口。它是目前最流行的 Linux 容器解决方案。
> Docker 将应用程序与该程序的依赖，打包在一个 image 文件里面。
> 运行这个文件，就会生成一个虚拟容器。程序在这个虚拟容器里运行，就好像在真实的物理机上运行一样。

### Docker 的用途

- **提供一次性的环境。**比如，本地测试他人的软件、持续集成的时候提供单元测试和构建的环境。
- **提供弹性的云服务。**因为 Docker 容器可以随开随关，很适合动态扩容和缩容。
- **组建微服务架构。**通过多个容器，一台机器可以跑多个服务，因此在本机就可以模拟出微服务架构。

### Docker 的安装与配置

- 使用`Homebrew`安装

```shell
brew install --cask --appdir=/Applications docker
```

- 通过命令检测版本

```shell
docker --version
```

- 配置镜像，在`Preferences--Docker Engine`中，修改`JSON`文件

```JSON
{
  "debug": true,
  "experimental": false,
  "registry-mirrors": [
    "https://e29lwva9.mirror.aliyuncs.com"
  ]
}
```

- 通过命令查看镜像是否配置成功

```shell
docker info
```

### HelloWorld 项目检测

- 抓去 image

```shell
docker image pull library/hello-world
```

- 运行 image

```shell
docker container run hello-world
```
