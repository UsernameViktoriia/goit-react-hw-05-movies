import styled from 'styled-components';

export const MoviesWrapper = styled.div`
  margin-top: 120px;
`;

export const Form = styled.form`
  display: flex;
`;

export const Input = styled.input`
  height: 38px;
  padding: 5px 10px;
  width: 400px;
  font-size: 30px;
`;

export const ButtonForm = styled.button`
  padding: 8px 16px;
  border-radius: 2px;
  background-color: #3f51b5;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  color: #fff;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 28px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  width: 180px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:hover {
    background-color: #303f9f;
  }
`;

export const FoundMovies = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`;
