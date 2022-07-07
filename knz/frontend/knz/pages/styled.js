import styled from "styled-components";

const Heading = styled.h1`
  font-size: 2rem;
  color: blue;
  line-height: 3rem;
  background-color: yellow;
  font-weight: bold;
  font-style: italic;
`;

const Card = styled.div`
  background-color: #f5f5f5;
  color: blue;
  line-height: 3rem;
  font-weight: bold;
  font-style: italic;
  height: 30%;
  width: 50%;
  margin: auto;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Home = () => {
  return (
    <div>
      <Card>
        <Heading>Using styled-components in Next.js</Heading>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          euismod, nisi vel consectetur interdum, nisl nisi rhoncus nisi,
          euismod aliquam nisl nisi vitae nisl.
        </p>
      </Card>
    </div>
  );
};

export default Home;
