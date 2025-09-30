import { AutoComplete, Button, Form, Input } from "antd";
import { Search } from "lucide-react";

const Countries = [{
  id: '+975',
  name: 'Bhutan'
}]

const App = () => {


  return (
    <div className="bg-gray-100 min-h-screen">
      <div className=" mx-auto w-1/2 flex items-center h-screen">
        <div className="w-full h-[200px] bg-gray-200 rounded-xl p-6">
          <Form layout="vertical">
            <Form.Item label="Mobile Number" name="mobile">
              <div className="flex">
              <AutoComplete
               onSelect={value => alert(value)}
               options={[{value: 'cat', label: 'Cat'}]}
               filterOption = {(value, option) => alert(value, option)}
               searchValue=""
              className="!w-[10%] [&_div]:!rounded-none [&_div]:!rounded-l-lg" 
              suffixIcon={<Search className="w-4"/>} 
              style={{ width: 200 }}  />
              <Input className="!w-[30%] !rounded-none !rounded-r-lg"></Input>
              </div>
              
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default App;
