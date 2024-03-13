<?php

namespace App\Http\Controllers;

use App\Models\Roles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Roles::all();
        return response()->json(['roles' => $roles]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    // Validar los datos del formulario
    $request->validate([
        'rol' => 'required|string|max:255',
    ]);

    // Verificar si el usuario está autenticado antes de acceder a su nombre
    $user = $request->user();
    $userName = $user ? $user->name : 'Unknown';

    $rol = new Roles();
    $rol->rol = $request->input('rol');
    $rol->usuariocreacion = $userName;
    $rol->usuariomodificacion = $userName; 

    $rol->save();

    return response()->json([
        'message' => 'Rol creado exitosamente',
        'data' => $rol, // Devuelve el objeto de modelo creado si lo necesitas en el cliente
    ], 201);
}

    /**
     * Display the specified resource.
     */
    public function show(Roles $roles)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Roles $roles)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Roles $role)
    {
        $validator = Validator::make($request->all(), [
            'rol' => 'required|string|max:255',
            // Agrega aquí más reglas de validación según tus requisitos
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $role->update($request->all());
        return response()->json(['message' => 'Role updated successfully', 'role' => $role]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Roles $role)
    {
        $role->delete();
        return response()->json(['message' => 'Role deleted successfully']);
    }
}
