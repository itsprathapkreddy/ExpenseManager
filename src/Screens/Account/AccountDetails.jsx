export const AccountDetails = (props) => {
  const { newUname, newCur, email } = props;
  return (
    <table>
      <tbody>
        <tr>
          <td style={{ padding: "10px" }}>User&nbsp;Name:</td>
          <td>{newUname}</td>
        </tr>
        <tr>
          <td style={{ padding: "10px" }}>Currency:</td>
          <td>{newCur}</td>
        </tr>
        <tr>
          <td style={{ padding: "10px" }}>Email:</td>
          <td>{email}</td>
        </tr>
      </tbody>
    </table>
  );
};
