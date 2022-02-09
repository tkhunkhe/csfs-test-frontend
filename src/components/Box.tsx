import styled from "styled-components/macro";

const Box = styled.div`
  max-height: ${(props: { maxHeight?: string; width?: string }) =>
    props.maxHeight};
  width: ${(props: { maxHeight?: string; width?: string }) => props.width};
  min-width: 16rem;
  border-radius: 1rem;
  opacity: 0.9;
  background-color: #ffffff;
  padding: 0.75rem;
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

export default Box;
