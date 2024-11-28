function Header(props) {
  return (
    <>
      <h1>Header:</h1>
      <p>{JSON.stringify(props.currentUser)}</p>
    </>
  );
}

export default Header;
