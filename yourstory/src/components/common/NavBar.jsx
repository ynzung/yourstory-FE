import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import LogoIcon from "../../assets/images/icon-logo.svg";
import AlertModal from "./AlertModal";
import SideMenu from "./SideMenu";

const NavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };
  localStorage.clear();
  //   연동 시 여기에서 회원 이름 조회
  localStorage.setItem("username", "숙멋사");
  const username = localStorage.getItem("username");

  return (
    <div>
      <Wrapper>
        <Logo src={LogoIcon} onClick={() => navigate("/")}></Logo>
        {username ? (
          <>
            <SubText>
              <Name>숙멋사님</Name>
              <Welcome>환영합니다</Welcome>
            </SubText>
            <NavList>
              <NavItem
                $isActive={activeMenu === "volunteer"}
                onClick={() => toggleMenu("volunteer")}
              >
                <Menu>봉사활동</Menu>
              </NavItem>
              <NavItem
                $isActive={activeMenu === "library"}
                onClick={() => toggleMenu("library")}
              >
                <Menu>이타적 도서관</Menu>
              </NavItem>
              <NavItem
                $isActive={activeMenu === "story"}
                onClick={() => toggleMenu("story")}
              >
                <Menu>우리의 이야기</Menu>
              </NavItem>
            </NavList>
            {activeMenu && (
              <SideMenu isVisible={!!activeMenu} menu={activeMenu} />
            )}
          </>
        ) : (
          <>
            <SubText>
              <PointerText onClick={() => navigate("/login")}>
                로그인
              </PointerText>
              <PointerText onClick={() => navigate("/register")}>
                회원가입
              </PointerText>
            </SubText>
            <NavList>
              <NavItem>
                <Menu onClick={() => setIsOpen(true)}>
                  <AlertModal isOpen={isOpen} />
                  봉사활동
                </Menu>
              </NavItem>
              <NavItem>
                <Menu onClick={() => setIsOpen(true)}>
                  <AlertModal isOpen={isOpen} />
                  이타적 도서관
                </Menu>
              </NavItem>
              <NavItem>
                <Menu onClick={() => setIsOpen(true)}>
                  <AlertModal isOpen={isOpen} />
                  우리의 이야기
                </Menu>
              </NavItem>
            </NavList>
          </>
        )}
      </Wrapper>
    </div>
  );
};

export default NavBar;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  background-color: var(--green);
  color: white;
  width: 145px;
  height: 100vh;
  box-shadow: 5px 0px 30px 0px #00000026;
  padding: 64px 60px 0px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 43px;
`;

const NavItem = styled.li`
  text-align: center;
  font-weight: ${(props) => (props.$isActive ? "700" : "400")};
  color: ${(props) => (props.$isActive ? "white" : "#fafc97")};
`;

const Logo = styled.img`
  width: 109px;
  height: 73px;
  margin-bottom: 50px;
  cursor: pointer;
`;

const SubText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-bottom: 140px;
  line-height: 19.36px;
  letter-spacing: -0.06em;
  text-align: center;
  color: #fafc97;
  font-family: Inter;
  font-size: 16px;
`;

const Name = styled.div`
  font-weight: 700;
`;

const Welcome = styled.div`
  font-weight: 400;
`;
const PointerText = styled.div`
  cursor: pointer;
`;

const Menu = styled.div`
  cursor: pointer;
  font-family: Inter;
  line-height: 21.78px;
  letter-spacing: -0.06em;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    font-weight: 700;
  }
`;
