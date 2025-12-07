/**
 * Business Service
 * API service layer for business operations
 */

import api from "./config";
import type {
  Business,
  CreateBusinessDTO,
  UpdateBusinessDTO,
  BusinessOverview,
  BalanceSummary,
} from "../../types/business.types";

/**
 * Create a new business
 */
export const createBusiness = async (
  data: CreateBusinessDTO
): Promise<Business> => {
  const response = await api.post<{ data: Business }>("/businesses", data);
  return response.data.data;
};

/**
 * Get all businesses for authenticated user
 */
export const getAllBusinesses = async (): Promise<Business[]> => {
  const response = await api.get<{ data: Business[] }>("/businesses");
  return response.data.data;
};

/**
 * Get business by ID
 */
export const getBusinessById = async (
  businessId: number
): Promise<Business> => {
  const response = await api.get<{ data: Business }>(
    `/businesses/${businessId}`
  );
  return response.data.data;
};

/**
 * Update an existing business
 */
export const updateBusiness = async (
  businessId: number,
  data: UpdateBusinessDTO
): Promise<Business> => {
  const response = await api.put<{ data: Business }>(
    `/businesses/${businessId}`,
    data
  );
  return response.data.data;
};

/**
 * Delete a business (soft delete)
 */
export const deleteBusiness = async (businessId: number): Promise<void> => {
  await api.delete(`/businesses/${businessId}`);
};

/**
 * Get business overview with statistics
 */
export const getBusinessOverview = async (
  businessId: number
): Promise<BusinessOverview> => {
  const response = await api.get<{ data: BusinessOverview }>(
    `/businesses/${businessId}/overview`
  );
  return response.data.data;
};

/**
 * Get balance summary
 */
export const getBalanceSummary = async (
  businessId: number,
  dateRange?: { startDate: string; endDate: string }
): Promise<BalanceSummary> => {
  const params = new URLSearchParams();

  if (dateRange?.startDate) params.append("startDate", dateRange.startDate);
  if (dateRange?.endDate) params.append("endDate", dateRange.endDate);

  const queryString = params.toString();
  const url = `/businesses/${businessId}/balance-summary${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await api.get<{ data: BalanceSummary }>(url);
  return response.data.data;
};
