"use client";
import { useEffect, useActionState } from "react";
import { useSession } from "next-auth/react";
import addMessage from "@/app/actions/addMessage";
import { toast } from "react-toastify";
import SubmitMessageButton from "./SubmitMessageButton";

const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession();
  const [state, formAction] = useActionState(addMessage, {});

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.submitted) toast.success("Message sent successfully");
  }, [state]);

  if (state.submitted) {
    <p className="text-green-500 mb-4">Your message has been sent</p>;
  }
  return (
    session && (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
        <form action={formAction}>
          <input
            type="hidden"
            id="property"
            name="property"
            defaultValue={property._id}
          />
          <input
            type="hidden"
            id="recipient"
            name="recipient"
            defaultValue={property.owner}
          />
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="body"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="body"
              placeholder="Enter your message"
              name="body"
            ></textarea>
          </div>
          <div>
            <SubmitMessageButton />
          </div>
        </form>
      </div>
    )
  );
};

export default PropertyContactForm;
