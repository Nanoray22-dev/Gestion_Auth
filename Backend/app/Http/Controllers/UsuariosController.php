<?php

namespace App\Http\Controllers;

use App\Models\Bitacoras;
use App\Models\User;
use App\Models\Usuarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UsuariosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
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
        // Validación de la solicitud
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);
    
        // Crear un nuevo usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    
        // Verificar si hay un usuario autenticado antes de registrar en la bitácora
        $userName = Auth::user() ? Auth::user()->name : 'Usuario Desconocido';
        $userId = Auth::id();
    
        // Crear una nueva entrada en la bitácora
        Bitacoras::create([
            'bitacora' => 'Nuevo usuario creado: ' . $user->name,
            'users_id' => $userId,
            'fecha' => now()->toDateString(),
            'hora' => now()->toTimeString(),
            'ip' => $request->ip(),
            'so' => $request->userAgent(),
            'navegador' => $request->header('User-Agent'),
            'usuario' => $userName
        ]);
    
        // Respuesta JSON con el usuario creado
        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Usuarios $usuarios)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'password' => 'nullable|string|min:6',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Bitacoras::create([
            'bitacora' => 'Usuario actualizado: ' . $user->name,
            'users_id' => Auth::id(), // ID del usuario autenticado que realizó la acción
            'fecha' => now()->toDateString(),
            'hora' => now()->toTimeString(),
            'ip' => $request->ip(),
            'so' => $request->userAgent(),
            'navegador' => $request->header('User-Agent'),
            'usuario' => Auth::user()->name // Nombre del usuario autenticado que realizó la acción
        ]);

        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }
}
