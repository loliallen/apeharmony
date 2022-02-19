import { Header } from "../containers/Header";
import { Mint } from "../containers/Mint";
import { Body, BodyContainer } from "../containers/Body";
import { Footer } from "../containers/Footer";
import { Authors } from "../containers/Authors";
import { Description } from "../containers/Description";
import { useRef } from "react";
import { Typography } from "@material-ui/core";
import Countdown from "react-countdown";

import {Layout} from "../containers/Layout";
const Index = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);
  return (
    <Layout>
      <Header links={[{ to: '/', href: "https://opensea.io/collection/apeharmonymonsterclub", label: "Purchase on OpenSea" }, { to: "/ppl", label: "My ApeHarmony" }]} />

      <BodyContainer>
        <Typography
          variant="h4"
          style={{ textTransform: "uppercase" }}
          align="center"
        >
          {"MONSTERS SPAWN IN "}
          <Countdown
            date={new Date("20 Dec 2021 22:11:00 GMT+3")}
            renderer={(props) => (
              <div>{`${props.hours + props.days * 24}H ${props.minutes}M ${
                props.seconds
              }S`}</div>
            )}
          />
        </Typography>
        <Body srcs={["/apes/1.gif", "/apes/4.gif", "/apes/3.gif"]} />
        <Body
          srcs={["/apes/5.gif", "/apes/2.gif", "/apes/6.gif"]}
          childIndex={1}
        />
        <Body srcs={["/apes/7.gif", "/apes/8.gif", "/apes/9.gif"]} />
      </BodyContainer>
      <Mint soldOut />
      <Description ref={aboutRef} />
      <Authors ref={teamRef} />
      <Footer ref={plansRef} />
    </Layout>
  );
};
export default Index