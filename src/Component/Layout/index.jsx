import React from "react";
import { Outlet } from "react-router-dom";
import Header1 from "./Header/index";
import ModelLogin from "../Login/ModelLogin/index";
import { Layout, Space } from "antd";
const { Header, Footer, Sider, Content } = Layout;

const Index = () => {
  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor: "#7dbcea",
  };
  const contentStyle = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#108ee9",
  };
  const siderStyle = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#3ba0e9",
  };
  const footerStyle = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#7dbcea",
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
            <ModelLogin/>
          <Header style={headerStyle}>{<Header1/>}</Header>
          <Layout hasSider>
            <Sider style={siderStyle}>Sider</Sider>
            <Content style={contentStyle}>{<Outlet/>}</Content>
          </Layout>
          {/* <Footer style={footerStyle}>{ <Footer1/>}</Footer> */}
        </Layout>
      </Space>
    </>
  );
};

export default Index;
