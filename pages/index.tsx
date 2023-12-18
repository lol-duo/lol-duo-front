import {NextPage} from "next";
import {HomeCssWrapper} from "@/component/home/HomeCssWrapper";
import HomeHeader from "@/component/home/Header";
import DuoMain from "@/component/duo/DuoMain";
import colorList from "../style/colorList";

const Home: NextPage = () => {

    return (
        <>
            <style jsx global>
                {`
                  body {
                    margin: 0;
                    background-color: ${colorList.semantic.background};
                  }
                `}
            </style>
            <HomeCssWrapper>
                <HomeHeader/>
                <DuoMain/>
                {/*<MainFooter></MainFooter>*/}
            </HomeCssWrapper>
        </>
    );
}
export default Home;