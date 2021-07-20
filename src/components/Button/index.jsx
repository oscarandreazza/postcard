import "./styles.css";

export const Button = ({ showMore, text, disabled }) => {
  return (
    <button disabled={disabled} className="button" onClick={showMore}>
      {text}
    </button>
  );
};
