import Header from "../../components/header";
import Footer from "../../components/footer";
import PublicViewsBrand from "../../views/public/brands";
import PublicViewsInfluencer from "../../views/public/influencer";
import styled from "styled-components";
import Brandlist from "../../components/list/brandlist";
import Infllist from "../../components/list/infllist";
import { AuthContext } from "../../Context/AuthContext";
import { useContext, useEffect } from "react";
import axios from "axios";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  box-sizing: border-box;
`;
const WrapperContent = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-start;
`;
const WrapperMidContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  margin: 50px auto;
`;
export default function Publiclayout() {
  const { user, count ,setCount } = useContext(AuthContext);
  const userRole = user.user.isBrand;
  const userId = user.user._id;

  const allMessage = async () => {
    try {
      const result = await axios.post(process.env.REACT_APP_API + "/api/messages/allmessage",
        {
          senderId: userId,
        },
      );
      var cnt = 0;
      for (var i=0; i < result.data.length; i ++) {
        if(result.data[i].read === false) {
          cnt = cnt + 1;
        }
      }
      console.log("false: ", cnt);
      setCount(cnt);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      allMessage();
      // console.log("1");
    }, 1000);
  }, []);

  return (
    <Wrapper>
      <Header />
      {userRole ? (
        <WrapperContent>
          <Brandlist />
          <WrapperMidContent>
            <PublicViewsBrand />
          </WrapperMidContent>
        </WrapperContent>
      ) : (
        <WrapperContent>
          <Infllist />
          <WrapperMidContent>
            <PublicViewsInfluencer />
          </WrapperMidContent>
        </WrapperContent>
      )}
      <Footer />
    </Wrapper>
  );
}
