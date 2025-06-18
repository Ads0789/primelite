'use server';

/**
 * @fileOverview Flow to calculate sales tax for a given order amount.
 *
 * - calculateSalesTax - A function that calculates the sales tax.
 * - CalculateSalesTaxInput - The input type for the calculateSalesTax function.
 * - CalculateSalesTaxOutput - The return type for the calculateSalesTax function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateSalesTaxInputSchema = z.object({
  subtotal: z.number().describe('The subtotal amount of the order.'),
  taxRate: z.number().describe('The sales tax rate (e.g., 0.08 for 8%).'),
});
export type CalculateSalesTaxInput = z.infer<typeof CalculateSalesTaxInputSchema>;

const CalculateSalesTaxOutputSchema = z.object({
  salesTax: z.number().describe('The calculated sales tax amount.'),
  total: z.number().describe('The total amount including sales tax.'),
});
export type CalculateSalesTaxOutput = z.infer<typeof CalculateSalesTaxOutputSchema>;

export async function calculateSalesTax(input: CalculateSalesTaxInput): Promise<CalculateSalesTaxOutput> {
  return calculateSalesTaxFlow(input);
}

const calculateSalesTaxFlow = ai.defineFlow(
  {
    name: 'calculateSalesTaxFlow',
    inputSchema: CalculateSalesTaxInputSchema,
    outputSchema: CalculateSalesTaxOutputSchema,
  },
  async input => {
    const salesTax = input.subtotal * input.taxRate;
    const total = input.subtotal + salesTax;
    return {
      salesTax: parseFloat(salesTax.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
    };
  }
);
