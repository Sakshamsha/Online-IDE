import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import background from '../images/karthik-swarnkar-AoNvwL-Dmtw-unsplash.jpg';
// import teamImage from '../assets/team.jpg'; // Placeholder for team image

const AboutPage = () => {
  return (
    <div>
      <Navbar/>
      <AboutWrapper>
        <Header>
          <h1>About CodeFusion</h1>
          <p>Your go-to platform for live coding HTML, CSS, and JavaScript.</p>
        </Header>

        <Section>
          <h2>Our Mission</h2>
          <p>
            CodeFusion was created to make coding more accessible to everyone, whether you're a beginner learning the basics of web development, or an experienced coder wanting to test ideas quickly. We provide an intuitive environment where you can write and see your code in action.
          </p>
        </Section>

        <FeaturesSection>
          <h2>Key Features</h2>
          <FeaturesGrid>
            <FeatureCard>
              <i className="fas fa-code"></i>
              <h3>Live Code Preview</h3>
              <p>Instantly see the results of your HTML, CSS, and JavaScript code.</p>
            </FeatureCard>

            <FeatureCard>
              <i className="fas fa-users"></i>
              <h3>Community Sharing</h3>
              <p>Share your code snippets with the CodeFusion community and collaborate on projects.</p>
            </FeatureCard>

            <FeatureCard>
              <i className="fas fa-puzzle-piece"></i>
              <h3>Modular Learning</h3>
              <p>Step-by-step tutorials and guides help you learn web development efficiently.</p>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesSection>

        <TeamSection>
          <h2>Meet the Team</h2>
          <p>We are a group of passionate developers who love coding and teaching.</p>
          {/* <TeamImage src={teamImage} alt="Team" /> */}
        </TeamSection>

        <CTASection>
          <h3>Ready to start coding?</h3>
          <StyledLink to="/dashboard">Try CodeFusion Now</StyledLink>
        </CTASection>
      </AboutWrapper>
    </div>
  );
};

export default AboutPage;

const AboutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
  background: url(${background}) no-repeat center center/cover;
  color: white;
  padding-top:90px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 3rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.5rem;
  }
`;

const Section = styled.section`
  max-width: 900px;
  margin-bottom: 50px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
  }
`;

const FeaturesSection = styled(Section)`
  text-align: center;
`;

const FeaturesGrid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const FeatureCard = styled.div`
  width: 250px;
  margin: 10px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  i {
    font-size: 2.5rem;
    color: #ff6f61;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
  }
`;

const TeamSection = styled(Section)`
  text-align: center;
`;

const TeamImage = styled.img`
  width: 80%;
  margin-top: 20px;
  border-radius: 10px;
`;

const CTASection = styled.div`
  margin-top: 40px;
  text-align: center;

  h3 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const StyledLink = styled(Link)`
  padding: 10px 20px;
  background-color: #7a0696;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #84259b;
  }
`;
