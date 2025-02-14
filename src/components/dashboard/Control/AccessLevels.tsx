import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AccessLevel } from "@/types/staff";

const accessLevelFormSchema = z.object({
  levels: z.array(z.object({
    name: z.string(),
    access: z.enum(['Full Access', 'Limited', 'None']),
    icon: z.any(),
    checked: z.boolean(),
    isDisabled: z.boolean().optional()
  }))
});

type AccessLevelFormValues = z.infer<typeof accessLevelFormSchema>;

interface AccessLevelsProps {
  initialLevels: AccessLevel[];
  onSave: (levels: AccessLevel[]) => Promise<void>;
}

const AccessLevels: React.FC<AccessLevelsProps> = ({ initialLevels, onSave }) => {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<AccessLevelFormValues>({
    resolver: zodResolver(accessLevelFormSchema),
    defaultValues: {
      levels: initialLevels
    }
  });

  const { isDirty } = form.formState;

  const handleAccessChange = (index: number, checked: boolean) => {
    const currentLevels = form.getValues("levels");
    const updatedLevels = [...currentLevels];
    const level = updatedLevels[index];
    
    level.checked = checked;
    if (level.checked) {
      switch(level.name) {
        case 'Dashboard':
        case 'Support':
        case 'International\ntransactions':
          level.access = 'Full Access';
          break;
        default:
          level.access = 'Limited';
      }
    } else {
      level.access = 'None';
    }
    
    form.setValue("levels", updatedLevels, { shouldDirty: true });
  };

  const handleAccessLevelChange = (index: number) => {
    const currentLevels = form.getValues("levels");
    const updatedLevels = [...currentLevels];
    const level = updatedLevels[index];
    
    if (level.checked) {
      level.access = level.access === 'Limited' ? 'Full Access' : 'Limited';
      form.setValue("levels", updatedLevels, { shouldDirty: true });
    }
  };

  const onSubmit = async (data: AccessLevelFormValues) => {
    try {
      setIsSaving(true);
      // Ensure we preserve the icon objects when saving
      const levelsWithIcons = data.levels.map(level => ({
        ...level,
        icon: initialLevels.find(initial => initial.name === level.name)?.icon || level.icon
      })) as AccessLevel[];
      
      await onSave(levelsWithIcons);
      form.reset(data); // Reset form state but keep current values
    } catch (error) {
      console.error('Error saving access levels:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-sm relative">
      <h3 className="text-lg font-semibold mb-4">Access Levels</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-10 gap-x-6 gap-y-8">
            {form.getValues("levels").map((level, index) => (
              <div key={index} className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  {level.icon}
                </div>
                <span className="text-sm text-gray-600 text-center whitespace-pre-line min-h-[2.5rem]">
                  {level.name}
                </span>
                <div className="flex flex-col items-center">
                  <div 
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 ease focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500
                      ${level.checked 
                        ? level.access === 'Full Access'
                          ? 'bg-red-100/80 hover:bg-red-100'
                          : 'bg-yellow-100/80 hover:bg-yellow-100'
                        : 'bg-gray-100/80 hover:bg-gray-100'
                      }`}
                  >
                    <Checkbox
                      id={`access-${index}`}
                      checked={level.checked}
                      onCheckedChange={(checked: boolean) => handleAccessChange(index, checked)}
                      className={`transition-all duration-200 focus:ring-offset-0 ${level.checked 
                        ? level.access === 'Full Access'
                          ? 'border-red-500/80 data-[state=checked]:bg-red-500/80 data-[state=checked]:text-white group-hover:border-red-500 group-hover:data-[state=checked]:bg-red-500'
                          : 'border-yellow-500/80 data-[state=checked]:bg-yellow-500/80 data-[state=checked]:text-white group-hover:border-yellow-500 group-hover:data-[state=checked]:bg-yellow-500'
                        : 'hover:border-gray-400'
                      }`}
                    />
                    <Label
                      htmlFor={`access-${index}`}
                      className={`text-xs select-none transition-all duration-200 ${
                        level.checked 
                          ? level.access === 'Full Access'
                            ? 'text-red-600/90 group-hover:text-red-600'
                            : 'text-yellow-600/90 group-hover:text-yellow-600'
                          : 'text-gray-500 group-hover:text-gray-600'
                      } cursor-pointer focus-visible:outline-none`}
                      onClick={(e: React.MouseEvent) => {
                        if (level.checked) {
                          e.preventDefault();
                          handleAccessLevelChange(index);
                        }
                      }}
                    >
                      {level.access}
                    </Label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isDirty && (
            <div className="absolute bottom-4 right-4 flex gap-3">
              <button 
                type="button"
                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                onClick={() => form.reset()}
                disabled={isSaving}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                disabled={isSaving || !isDirty}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default AccessLevels;