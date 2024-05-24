import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export default function DashProfile() {
    const { currentstudent } = useSelector((state) => state.student);
    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-4">
                <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
                    <img
                        src={currentstudent.profilePicture}
                        alt="user"
                        className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
                    />
                </div>
                <TextInput
                    type="text"
                    id="username"
                    placeholder="username"
                    defaultValue={currentstudent.name}
                />
                <TextInput
                    type="email"
                    id="email"
                    placeholder="email"
                    defaultValue={currentstudent.email}
                />
                <TextInput
                    type="password"
                    id="password"
                    placeholder="password"
                />
                <TextInput
                    type="studentID"
                    id="studentID"
                    placeholder="studentID"
                    defaultValue={currentstudent.studentID}
                />
                <TextInput
                    type="dateOfBirth"
                    id="dateOfBirth"
                    placeholder="dateOfBirth"
                    defaultValue={currentstudent.dateOfBirth}
                />
                <TextInput
                    type="address"
                    id="address"
                    placeholder="address"
                    defaultValue={currentstudent.address}
                />
                <TextInput
                    type="contact"
                    id="contact"
                    placeholder="contact"
                    defaultValue={currentstudent.contact}
                />
                <Button type="submit"  outline>
                    Update
                </Button>
            </form>
            <div className="text-red-500 flex justify-between mt-5">
                <span className="cursor-pointer">Delete Account</span>
                <span className="cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
}
