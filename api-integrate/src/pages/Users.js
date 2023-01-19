import { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      // 요청이 시작 할 때에는 error와 users를 초기화하고
      setError(null);
      setUsers(null);
      // loading 상태를 true로 바꾼다
      setLoading(true);
      const response = await axios.get(
        // 이 부분에 들어가는 api의 주소가 다르면 에러를 호출합니다
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>다시 불러오기</button>
    </>
  );
}

export default Users;
