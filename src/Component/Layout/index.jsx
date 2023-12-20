import React from "react";
import { Outlet } from "react-router-dom";
import Header1 from "./Header/index";
import ModelLogin from "../Login/ModelLogin/index";
import { Layout, Space } from "antd";
import { useEffect } from "react";
import { loginService } from "../../services/loginService";
const { Header, Sider, Content,  } = Layout;
const Index = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    else {
      const getProfile = async () => {
        const res = await loginService.getProfile();
        if (res) {
          localStorage.setItem("user", JSON.stringify(res));
        }
      }
      getProfile();
    }
  }, []);
  const headerStyle = {
    textAlign: "center",
    width: "100%",
    backgroundColor: "#ffffff",
  };
  const contentStyle = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#F5F6F9",
  };
  const siderStyle = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#ffffff",
  };
  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
        size={[0, 48]}
      >
        <Layout>
          <ModelLogin />
          <Header style={headerStyle}>{<Header1 />}</Header>
          <Layout hasSider>
            <Sider style={siderStyle}>Sider</Sider>
            <Content style={contentStyle}>{<Outlet />}</Content>
          </Layout>
        </Layout>
      </Space>
    </>
  );
};

export default Index;
