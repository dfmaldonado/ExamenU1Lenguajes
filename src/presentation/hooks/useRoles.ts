import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react"
import { useNavigate } from "react-router";
import { getPaginationRolesAction } from "../../core/actions/roles/get-pagination-roles.action";
import { getOneRoleAction } from "../../core/actions/roles/get-one-role.action";
import { RoleModel } from "../../core/models/role.model";
import { createRoleAction } from "../../core/actions/roles/create-role.action";
import { editRoleAction } from "../../core/actions/roles/edit-role.action";
import { deleteRoleAction } from "../../core/actions/roles/delete-role.action";

export const useRoles = (roleId?: string) => {
  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  
  const rolesPaginationQuery = useQuery({
    queryKey: ["roles", page, pageSize, searchTerm], // Unique key 
    queryFn: () => getPaginationRolesAction(page, pageSize, searchTerm),
    staleTime: 1000 * 60 * 5, // 5M
    refetchOnWindowFocus: false,
  });

  const oneRoleQuery = useQuery({
    queryKey: ["role", roleId],
    queryFn: () => getOneRoleAction(roleId!),
    enabled: !!roleId,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const createRoleMutation = useMutation({
    mutationFn: (role: RoleModel) => createRoleAction(role),
    onSuccess: (data) => {
      if(data.status) {
        navigate("/roles");
      }
    },
    onError: (data) => {
      console.log(data);
    }
  });

  const editRoleMutation = useMutation({
    mutationFn: (role: RoleModel) => editRoleAction(role, roleId!),
    onSuccess: (data) => {
      if(data.status) {
        refreshRoles();
        navigate("/roles");
      }
    },
    onError: (data) => {
      console.log(data);
    },
  });

    const deleteRoleMutation = useMutation({
    mutationFn: () => deleteRoleAction(roleId!),
    onSuccess: (data) => {
      if(data.status) {
        refreshRoles();
        navigate("/roles");
      }
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const refetch = rolesPaginationQuery.refetch;

  const refreshRoles = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    // Properties
    page,
    pageSize,
    searchTerm,
    rolesPaginationQuery,
    oneRoleQuery,
    createRoleMutation,
    editRoleMutation,
    deleteRoleMutation,

    // Methods
    setPage,
    setPageSize,
    setSearchTerm,
    refreshRoles,
  }
}