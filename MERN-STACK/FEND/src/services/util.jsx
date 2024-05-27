export const withHeaders = () => {
    const token = sessionStorage.getItem("token");    
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };
  