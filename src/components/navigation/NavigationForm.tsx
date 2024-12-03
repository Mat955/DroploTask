import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import type {NavigationFormData} from "@/types/navigation";

const schema = z.object({
  label: z.string().min(1, "Nazwa jest wymagana"),
  url: z.string().url("Nieprawidłowy format URL").optional().or(z.literal("")),
});

interface NavigationFormProps {
  onSubmit: (data: NavigationFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function NavigationForm({onSubmit, onCancel}: NavigationFormProps) {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<NavigationFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmitHandler = async (data: NavigationFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className='w-full bg-white rounded-lg border border-[#D0D5DD] p-6 mt-6'>
      <form onSubmit={handleSubmit(onSubmitHandler)} className='space-y-4'>
        <div>
          <label
            htmlFor='label'
            className='block text-sm font-medium text-[#344054] mb-1.5'
          >
            Nazwa
          </label>
          <input
            {...register("label")}
            type='text'
            id='label'
            placeholder='np. Promocje'
            className={`w-full px-3.5 py-2.5 rounded-lg border ${
              errors.label ? "border-red-500" : "border-[#D0D5DD]"
            } focus:outline-none focus:ring-1 focus:ring-[#7F56D9] focus:border-[#7F56D9]`}
          />
          {errors.label && (
            <p className='mt-1 text-sm text-red-500'>{errors.label.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='url'
            className='block text-sm font-medium text-[#344054] mb-1.5'
          >
            Link
          </label>
          <div className='relative'>
            <input
              {...register("url")}
              type='text'
              id='url'
              placeholder='Wklej lub wyszukaj'
              className={`w-full pl-11 pr-3.5 py-2.5 rounded-lg border ${
                errors.url ? "border-red-500" : "border-[#D0D5DD]"
              } focus:outline-none focus:ring-1 focus:ring-[#7F56D9] focus:border-[#7F56D9]`}
            />
            <MagnifyingGlassIcon className='absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#667085]' />
          </div>
          {errors.url && (
            <p className='mt-1 text-sm text-red-500'>{errors.url.message}</p>
          )}
        </div>

        <div className='flex justify-start gap-3 pt-2'>
          <button
            type='button'
            onClick={onCancel}
            className='px-4 py-2.5 text-sm font-semibold text-[#344054] border border-[#D0D5DD] hover:bg-gray-50 rounded-lg'
          >
            Anuluj
          </button>
          <button
            type='submit'
            className='px-4 py-2.5 text-sm font-semibold text-[#6941C6] border border-[#D6BBFB] bg-white hover:bg-[#F9F5FF] rounded-lg'
          >
            Dodaj
          </button>
        </div>
      </form>
    </div>
  );
}
