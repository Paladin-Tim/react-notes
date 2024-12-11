import { Input, Button } from "antd";
import { SortAscendingOutlined, OrderedListOutlined } from "@ant-design/icons";
import { useInput } from "../../hooks/useInput";
const { Search } = Input;

export const Menu = ({ isSorted, setIsSorted, onSearch }) => {
  const searchInput = useInput();

  const searchNotes = () => {
    onSearch(searchInput.value);
  };

  return (
    <nav className="navMenu">
      <Search
        {...searchInput}
        placeholder="Search notes..."
        size="large"
        onSearch={searchNotes}
        enterButton
      />
      {!isSorted ? (
        <Button
          shape="circle"
          icon={<SortAscendingOutlined />}
          size="large"
          className="btnSort"
          onClick={() => {
            setIsSorted(true);
          }}
        />
      ) : (
        <Button
          shape="circle"
          icon={<OrderedListOutlined />}
          size="large"
          className="btnSort"
          onClick={() => {
            setIsSorted(false);
          }}
        />
      )}
    </nav>
  );
};
