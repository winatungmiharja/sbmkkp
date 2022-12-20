import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge classes with tailwind-merge and clsx full feature
 *
 * Put extendable className props on the **end of parameter** so it will merge correctly.
 * Adding className on the former parameter won't override the latter.
 *
 * @example
 * clsxm('flex flex-col', 'text-gray-700', className)
 */
export default function clsxm(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}
