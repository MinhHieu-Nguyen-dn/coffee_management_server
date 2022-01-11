class Response {
    success;
    message;
    code;
    resources;
    constructor(success, code, message, resources) {
      this.success = success;
      this.code = code;
      this.message = message;
      this.resources = resources;
    }
  }
  
  const OK = (resources, message = 'Successful') => {
    return new Response(true, 200, message, resources);
  };
  
  const NOT_FOUND = () => {
    return new Response(false, 404, 'Not Found', []);
  };
  
  const FAIL = () => {
    return new Response(false, 500, 'Fail', []);
  };
  
  export { OK, NOT_FOUND, FAIL };