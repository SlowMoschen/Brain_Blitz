import Form from "../../../../shared/components/Form";
import Input from "../../../../shared/components/Input";
import { HttpService } from "../../../../shared/services/httpService";

export default function Login() {
    const httpService = new HttpService();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // const form = event.currentTarget;
        // const formData = new FormData(form);
        // const email = formData.get("email") as string;
        // const password = formData.get("password") as string;

        try {
            const response = await httpService.post("/auth/login", { email: 'philipp.millner@outlook.com', password: 'Test12345!' });
            if (response.data) {
                console.log(response.data);
                return;
            }

            throw new Error(response.message);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Form  onSubmit={ (e) => handleSubmit(e) }>
            <Input type="email" placeholder="email" className="text-bg-primary"  />
            <Input type="password" placeholder="password" className="text-bg-primary" />
        </Form>
    )
}