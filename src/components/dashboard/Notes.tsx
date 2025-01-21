import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema for validation
const noteSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  body: z.string().min(1, "Le contenu est requis"),
});

// Define TypeScript types for the form fields
type NoteFormType = z.infer<typeof noteSchema>;

type NotesProps = {
  onSave: (data: NoteFormType) => void; // Callback function when the form is submitted
  notificationCount?: number; // Number of notifications for "See all notes"
};

const Notes: React.FC<NotesProps> = ({ onSave, notificationCount = 0 }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteFormType>({
    resolver: zodResolver(noteSchema),
  });

  const onSubmit: SubmitHandler<NoteFormType> = (data) => {
    onSave(data); // Handle save
  };

  return (
    <div className="w-full bg-white rounded-lg  border border-stone-200 shadow-md p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">My Notes</h2>
        <button className="relative px-4 py-1 bg-[#F1C735] text-black font-bold rounded-full shadow-md">
          See all notes
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {notificationCount}
            </span>
          )}
        </button>
      </div>

      {/* Notes Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="bg-primary rounded-2xl pl-5 p-2 text-white">
          {/* Title Input */}
          <div>
            <input
              type="text"
              placeholder="Title"
              {...register("title")}
              className="w-full bg-transparent text-lg font-medium placeholder-white focus:outline-none"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Body Input */}
          <div className="mt-2">
            <textarea
              placeholder="This is body"
              {...register("body")}
              rows={3}
              className="w-full bg-transparent placeholder-white text-sm focus:outline-none"
            />
            {errors.body && (
              <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
            )}
          </div>
          {/* Save Button */}
        <div className="text-right">
          <button
            type="submit"
            className="px-4 py-2 bg-white text-blue-500 font-extrabold rounded-full shadow-md border border-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Save
          </button>
        </div>
        </div>

        
      </form>
    </div>
  );
};

export default Notes;
